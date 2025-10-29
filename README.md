# WEBXPAY Sample

Note: I am not affiliated with [WEBXPAY](https://webxpay.com/). I built this sample to test implementations.

---

### Security

- **Do NOT expose your public key.**
  - It should ONLY be on your SERVER side.
- This sample stores the public key in browser cookies. Do **NOT** do this in production. This is purely for sample and testing purposes.

---

### About This Sample

- Frontend: Svelte 5, Tailwind, Font Awesome 6 Icons
- Backend: SvelteKit server side functions
- **Signature checks and encryption can be done with browser APIs!**
  - You may be able to run this on edge runtimes.
  - **Do NOT expose your public key.**

---

### Get Started

Before you get started, please read the above.

If you've already read that, ensure you have done the following for this sample to work correctly:

1. Set the Return URL in your WEBXPAY account settings.
   - Set it to: `{{page.url.origin}}/callback`

#### Running Locally

To run this project locally:

```bash
# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

### Live Preview

You can access a live version of this sample at: [https://webxpay-sample.suminda.dev/](https://webxpay-sample.suminda.dev/)
