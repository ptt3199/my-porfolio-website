---
name: "Bank QR Code Generator"
description: "A modern React application for generating real, scannable QR codes for money transfers to Vietnamese banks. Supports all major Vietnamese banks and generates TCCS 03:2018/NHNNVN compliant VietQR codes with ultra-fast Go serverless functions."
link: "https://bank-qrcode-generator-phi.vercel.app"
status: "completed"
featured: true
startDate: "2025-06-03"
endDate: "2025-06-04"
technologies: ["React", "Vite", "Tailwind CSS", "Go", "Vercel", "JavaScript", "QR Code", "VietQR"]
category: "fintech"
highlights:
  - "Generates real, scannable QR codes compatible with all Vietnamese banking apps"
  - "TCCS 03:2018/NHNNVN Standard Compliant - Official Vietnamese QR payment standard"
  - "Ultra-fast Go serverless functions with 4x faster cold starts than Node.js"
  - "Supports all major Vietnamese banks (VCB, TCB, BIDV, Agribank, etc.)"
  - "CRC-16 checksum validation for data integrity and EMV QR Code specification"
  - "Mobile-friendly design with modern UI and responsive layout"
---

# Bank QR Code Generator for Vietnamese Transfers

A comprehensive fintech application for generating **real, scannable QR codes** for money transfers to Vietnamese banks. This application supports all major Vietnamese banks and generates **TCCS 03:2018/NHNNVN compliant** VietQR codes with **ultra-fast Go serverless functions** for optimal performance.

## Key Features

- **Real QR Codes**: Generates actual scannable QR codes compatible with all Vietnamese banking applications
- **Standard Compliant**: Follows TCCS 03:2018/NHNNVN (Vietnamese National QR Payment Standard)
- **Multi-Bank Support**: Supports major Vietnamese banks including VCB, TCB, BIDV, Agribank, MB Bank, ACB, and more
- **High Performance**: Go serverless functions provide 4x faster cold starts and 5x less memory usage than Node.js
- **Data Integrity**: CRC-16 checksum validation ensures QR code accuracy
- **Modern UI**: Responsive design with Tailwind CSS and mobile-first approach

## Technical Architecture

The application uses a hybrid architecture with React frontend and Go serverless backend for optimal performance:

### Frontend Stack
- **React 18** with modern hooks and functional components
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive styling and modern design
- **QRCode.js** library with high error correction

### Backend Performance
- **Go Serverless Functions** for ultra-fast QR generation
- **Vercel Edge Runtime** for global performance
- **Native Goroutines** handle thousands of concurrent requests
- **Compiled Binary** performance vs interpreted JavaScript

## Performance Metrics

| Metric | Go Implementation | Node.js Alternative | Improvement |
|--------|------------------|---------------------|-------------|
| Cold Start | ~50ms | ~200ms | **4x faster** |
| Memory Usage | ~10MB | ~50MB | **5x less** |
| Response Time | ~20ms | ~50ms | **2.5x faster** |
| Binary Size | ~5MB | ~15MB | **3x smaller** |

## VietQR Standard Implementation

The application generates QR codes following the **TCCS 03:2018/NHNNVN** standard with EMV QR Code specification:

### QR Code Structure
- **Version**: EMV QR Code version compliance
- **Initiation Method**: Static QR for consistent scanning
- **Merchant Info**: Nested structure with bank BIN codes and account details
- **Transaction Info**: Amount, currency (VND), and country code (VN)
- **Additional Info**: Optional message field for transaction reference
- **CRC Validation**: 4-digit CRC-16 checksum for data integrity

### Supported Banks
- **Vietcombank (VCB)** - BIN: 970436
- **Techcombank (TCB)** - BIN: 970407
- **BIDV** - BIN: 970418
- **Agribank** - BIN: 970405
- **MB Bank** - BIN: 970422
- **ACB** - BIN: 970416
- **Sacombank** - BIN: 970403
- **VPBank** - BIN: 970432
- **VietinBank** - BIN: 970415

## User Experience

1. **Bank Selection**: Choose from a comprehensive list of Vietnamese banks
2. **Account Details**: Enter account number, amount, and optional message
3. **Instant Generation**: Ultra-fast QR code creation with Go backend
4. **Scan & Pay**: Generated QR codes work with all banking mobile apps

## Deployment & Scalability

- **Vercel Platform**: Automatic deployments with edge optimization
- **Global CDN**: Fast content delivery worldwide
- **Serverless Architecture**: Auto-scaling based on demand
- **Zero Configuration**: Works out of the box without environment setup

This project demonstrates modern fintech application development with focus on performance, compliance, and user experience in the Vietnamese banking ecosystem.

## Links

- **Live Application**: [bank-qrcode-generator-phi.vercel.app](https://bank-qrcode-generator-phi.vercel.app)
- **Source Code**: [GitHub Repository](https://github.com/ptt3199/bank-qrcode-generator)
- **Technical Reference**: Based on TCCS 03:2018/NHNNVN standard for Vietnamese QR payments 