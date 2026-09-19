# 🏪 DukaanSetu

DukaanSetu is a dual-sided e-commerce marketplace built for local grocery stores and their customers. It empowers small retailers to digitize their inventory using AI, while allowing customers to compare prices across local stores and order directly.

## 🚀 Features

### For Retailers
* **AI Catalog Generation:** Instantly add products to your inventory simply by snapping a photo. Powered by Google's Gemini AI, which extracts product names, brands, categories, and pack sizes automatically.
* **Order Management:** View and manage incoming customer orders.
* **Store Dashboard:** Manage inventory stock counts, set pricing, and verify store details.

### For Customers
* **Smart Search & Compare:** Search for groceries and instantly compare prices across nearby trusted local stores.
* **Persistent Cart:** Add items to your cart from multiple local stores without losing your data on refresh.
* **Seamless Checkout:** Place orders directly to the merchant with a fully integrated checkout flow.

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Vite, Tailwind CSS
* **Backend API:** Node.js, Express (Deployed via Vercel Serverless Functions)
* **Database & Auth:** Supabase (PostgreSQL)
* **AI Integration:** Google Gemini 1.5 Flash API
* **Hosting:** Vercel

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Piyush0804-hub/dukaansetu.git
   cd dukaansetu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following keys:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_API_URL=http://localhost:5000 # Or your live Vercel backend URL
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🌐 Live Demo
* **Frontend:** [https://dukaan-setu-liart.vercel.app](https://dukaan-setu-liart.vercel.app)
* **Backend API:** [https://dukaan-setu-backend.vercel.app](https://dukaan-setu-backend.vercel.app)
