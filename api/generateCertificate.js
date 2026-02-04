import { connectToDB } from "./_db.js";
import { createCanvas, loadImage } from "canvas";
import crypto from "crypto";
import QRCode from "qrcode";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { username, email, course } = req.body;
  const serialNumber = `BW-2026-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
  const date = new Date().toLocaleDateString();

  try {
    const db = await connectToDB();
    await db.collection("users").updateOne(
      { email: email },
      { $set: { certificateId: serialNumber, certifiedDate: date } }
    );

    const canvas = createCanvas(1200, 800);
    const ctx = canvas.getContext("2d");

    // --- (Previous Background & Text Code) ---
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1200, 800);
    ctx.strokeStyle = "#0f172a"; ctx.lineWidth = 40; ctx.strokeRect(20, 20, 1160, 760);
    ctx.strokeStyle = "#22c55e"; ctx.lineWidth = 5; ctx.strokeRect(50, 50, 1100, 700);

    ctx.textAlign = "center";
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 80px Arial";
    ctx.fillText("CERTIFICATE", 600, 180);
    ctx.font = "bold 70px Arial";
    ctx.fillText(username.toUpperCase(), 600, 430);

    // --- 📱 GENERATE & DRAW QR CODE ---
    // URL that the QR code will open
    const verifyUrl = `https://bravewave.app/verify?id=${serialNumber}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 150 });
    const qrImage = await loadImage(qrDataUrl);
    ctx.drawImage(qrImage, 80, 550, 150, 150); // Positioned above the ID text

    // --- Footer Details ---
    ctx.textAlign = "left";
    ctx.fillStyle = "#64748b";
    ctx.font = "bold 16px Courier New";
    ctx.fillText(`VERIFICATION ID: ${serialNumber}`, 80, 720);
    ctx.font = "italic 13px Arial";
    ctx.fillText("Scan QR to verify authenticity", 80, 745);

    // --- Signature ---
    ctx.textAlign = "center";
    ctx.strokeStyle = "#0f172a"; ctx.beginPath(); ctx.moveTo(850, 710); ctx.lineTo(1100, 710); ctx.stroke();
    ctx.font = "italic 22px Georgia"; ctx.fillText("Lead Instructor", 975, 745);

    const buffer = canvas.toBuffer("image/png");
    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  } catch (err) {
    res.status(500).send("Error");
  }
}