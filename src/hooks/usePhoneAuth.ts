import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const usePhoneAuth = (setError: (error: string) => void) => {
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });
      if (error) throw error;
      setShowOTP(true);
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: "sms",
      });
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    phone,
    setPhone,
    showOTP,
    setShowOTP,
    otp,
    setOTP,
    handleSendOTP,
    handleVerifyOTP,
  };
};