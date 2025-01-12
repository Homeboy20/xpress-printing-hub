import React from "react";
import { PhoneNumberInput } from "./auth/PhoneNumberInput";
import { OTPVerification } from "./auth/OTPVerification";
import { usePhoneAuth } from "@/hooks/usePhoneAuth";

interface PhoneAuthProps {
  setError: (error: string) => void;
}

export const PhoneAuth = ({ setError }: PhoneAuthProps) => {
  const {
    phone,
    setPhone,
    showOTP,
    setShowOTP,
    otp,
    setOTP,
    handleSendOTP,
    handleVerifyOTP,
  } = usePhoneAuth(setError);

  return (
    <div className="space-y-6">
      {!showOTP ? (
        <PhoneNumberInput
          phone={phone}
          setPhone={setPhone}
          onSubmit={handleSendOTP}
        />
      ) : (
        <OTPVerification
          otp={otp}
          setOTP={setOTP}
          onSubmit={handleVerifyOTP}
          onBack={() => setShowOTP(false)}
        />
      )}
    </div>
  );
};