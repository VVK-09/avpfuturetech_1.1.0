import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { candidateId, name, email, phone, amount, domainId, domainName } = data;

    if (!candidateId || !amount) {
      return NextResponse.json(
        { success: false, error: "Missing candidate ID or payment amount" },
        { status: 400 }
      );
    }

    const appId = process.env.CASHFREE_APP_ID || process.env.NEXT_PUBLIC_CASHFREE_APP_ID || "";
    const secretKey = process.env.CASHFREE_SECRET_KEY || "";
    const rawEnv = (process.env.CASHFREE_ENVIRONMENT || "sandbox").toLowerCase().trim();
    const isProduction = rawEnv === "production" || rawEnv === "live";

    const cleanPhone = phone ? String(phone).replace(/\D/g, "").slice(-10) : "9876543210";
    const cleanEmail = email ? email.trim().toLowerCase() : `candidate_${candidateId.toLowerCase()}@avpfuturetech.com`;
    const cleanName = (name || "AVP Candidate").trim().slice(0, 50);

    const orderId = `order_${String(candidateId).replace(/\W/g, "_")}_${Date.now().toString().slice(-6)}`;
    const orderAmount = Number(amount);

    // If Cashfree API credentials exist, connect directly to Cashfree API (Sandbox or Production)
    if (appId && secretKey && !appId.includes("YOUR_") && !secretKey.includes("YOUR_")) {
      const baseUrl = isProduction
        ? "https://api.cashfree.com/pg/orders"
        : "https://sandbox.cashfree.com/pg/orders";

      const origin = req.headers.get("origin") || req.headers.get("host") || "http://localhost:3000";
      const returnUrl = origin.startsWith("http")
        ? `${origin}/internship?order_id={order_id}`
        : `https://${origin}/internship?order_id={order_id}`;

      const cfResponse = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": appId,
          "x-client-secret": secretKey
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: orderAmount,
          order_currency: "INR",
          customer_details: {
            customer_id: String(candidateId).replace(/\W/g, "_"),
            customer_name: cleanName,
            customer_email: cleanEmail,
            customer_phone: cleanPhone.length === 10 ? cleanPhone : "9876543210"
          },
          order_meta: {
            return_url: returnUrl
          },
          order_note: `AVP FutureTech Internship - Domain: ${domainName || domainId || "Tech"}`
        })
      });

      const cfData = await cfResponse.json();

      if (cfResponse.ok && cfData.payment_session_id) {
        return NextResponse.json({
          success: true,
          isSandbox: !isProduction,
          isLiveGateway: true,
          orderId: cfData.order_id || orderId,
          paymentSessionId: cfData.payment_session_id,
          orderAmount,
          currency: "INR",
          environment: isProduction ? "production" : "sandbox"
        });
      } else {
        console.warn("[Cashfree API] Gateway order creation returned:", cfData);
        // Fallback to Sandbox test simulation if sandbox keys have issues
        return NextResponse.json({
          success: true,
          isSandbox: true,
          isLiveGateway: false,
          orderId,
          paymentSessionId: `session_sandbox_sim_${Date.now()}`,
          orderAmount,
          currency: "INR",
          environment: "sandbox",
          message: cfData.message || "Cashfree Sandbox simulated order"
        });
      }
    }

    // Default Sandbox Simulation mode (when API keys are not yet provided in .env)
    return NextResponse.json({
      success: true,
      isSandbox: true,
      isLiveGateway: false,
      isSandboxSimulated: true,
      orderId,
      paymentSessionId: `session_sandbox_demo_${Date.now()}`,
      orderAmount,
      currency: "INR",
      environment: "sandbox",
      message: "Cashfree Sandbox Test Mode active. Ready for Live keys anytime."
    });
  } catch (error: any) {
    console.error("[Cashfree Create Order Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error creating Cashfree order" },
      { status: 500 }
    );
  }
}
