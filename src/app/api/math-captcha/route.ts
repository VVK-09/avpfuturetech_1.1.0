import { NextResponse } from "next/server";
import crypto from "crypto";

const SECRET_SALT = process.env.CAPTCHA_SECRET || "avp_futuretech_math_captcha_secure_salt_2026";

function generateMathProblem() {
  const operations = ["+", "+", "-", "+", "*"];
  const op = operations[Math.floor(Math.random() * operations.length)];
  let num1 = 1;
  let num2 = 1;
  let answer = 0;

  if (op === "+") {
    num1 = Math.floor(Math.random() * 15) + 2; // 2 to 16
    num2 = Math.floor(Math.random() * 12) + 1; // 1 to 12
    answer = num1 + num2;
  } else if (op === "-") {
    num1 = Math.floor(Math.random() * 15) + 10; // 10 to 24
    num2 = Math.floor(Math.random() * (num1 - 2)) + 1; // 1 to num1-2
    answer = num1 - num2;
  } else if (op === "*") {
    num1 = Math.floor(Math.random() * 7) + 2; // 2 to 8
    num2 = Math.floor(Math.random() * 5) + 2; // 2 to 6
    answer = num1 * num2;
  }

  const opSymbol = op === "*" ? "×" : op === "-" ? "−" : "+";
  const question = `${num1} ${opSymbol} ${num2}`;
  const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes validity
  const payload = `${answer}:${expiry}`;
  const hash = crypto.createHmac("sha256", SECRET_SALT).update(payload).digest("hex");
  const token = Buffer.from(`${payload}:${hash}`).toString("base64");

  return { question, token, num1, num2, op: opSymbol };
}

function verifyMathToken(token: string, userAnswer: number | string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [answerStr, expiryStr, hash] = decoded.split(":");
    if (!answerStr || !expiryStr || !hash) return false;

    // Check expiry
    if (Date.now() > parseInt(expiryStr, 10)) return false;

    // Verify cryptographic integrity
    const expectedHash = crypto
      .createHmac("sha256", SECRET_SALT)
      .update(`${answerStr}:${expiryStr}`)
      .digest("hex");
    if (expectedHash !== hash) return false;

    // Verify answer
    const expectedAnswer = parseInt(answerStr, 10);
    const userVal = parseInt(String(userAnswer).trim(), 10);
    return expectedAnswer === userVal;
  } catch {
    return false;
  }
}

export async function GET() {
  const problem = generateMathProblem();
  return NextResponse.json({
    success: true,
    question: problem.question,
    token: problem.token,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, answer } = body;

    if (!token || answer === undefined || answer === null || answer === "") {
      return NextResponse.json(
        { success: false, message: "Security answer is required." },
        { status: 400 }
      );
    }

    const isValid = verifyMathToken(token, answer);
    if (!isValid) {
      // Generate fresh problem immediately to prevent brute-forcing
      const newProblem = generateMathProblem();
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect security answer or challenge expired. Please solve the updated problem.",
          newChallenge: {
            question: newProblem.question,
            token: newProblem.token,
          },
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Human verification successful.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Validation error occurred." },
      { status: 500 }
    );
  }
}
