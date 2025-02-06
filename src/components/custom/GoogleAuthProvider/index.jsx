"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleAuthProvider({ children }) {
  return (
    <GoogleOAuthProvider clientId="304844630448-bgb0koei9sm03ej081llseej5tk52hi2.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}
