import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const usePhoneAuth = (setError: (error: string) => void) => {
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove any non-digit characters except the plus sign
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Ensure it starts with a plus sign
    if (!cleaned.startsWith('+')) {
      return `+${cleaned}`;
    }
    
    return cleaned;
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedPhone = formatPhoneNumber(phone);
      console.log('Sending OTP to:', formattedPhone); // Debug log
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });
      
      if (error) throw error;
      setShowOTP(true);
      setError("");
    } catch (error: any) {
      console.error('OTP Error:', error); // Debug log
      setError(error.message);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedPhone = formatPhoneNumber(phone);
      console.log('Verifying OTP for:', formattedPhone); // Debug log
      
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: "sms",
      });
      
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      console.error('Verification Error:', error); // Debug log
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