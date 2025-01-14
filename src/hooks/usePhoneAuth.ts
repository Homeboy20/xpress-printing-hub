import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const usePhoneAuth = (setError: (error: string) => void) => {
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-digit characters except plus sign
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // If number doesn't start with +, assume it needs one
    if (!cleaned.startsWith('+')) {
      return `+${cleaned}`;
    }
    
    return cleaned;
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedPhone = formatPhoneNumber(phone);
      console.log('Attempting to send OTP via MessageBird to:', formattedPhone);
      
      const { error, data } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          channel: 'sms'
        }
      });
      
      if (error) {
        console.error('MessageBird OTP Error:', error);
        throw error;
      }
      
      console.log('OTP sent successfully:', data);
      setShowOTP(true);
      setError("");
    } catch (error: any) {
      console.error('MessageBird Error:', error);
      if (error.message.includes('originator is invalid')) {
        setError('Please check if MessageBird is properly configured in Supabase Auth settings.');
      } else {
        setError(error.message || 'Failed to send verification code');
      }
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedPhone = formatPhoneNumber(phone);
      console.log('Verifying OTP for:', formattedPhone);
      
      const { error, data } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: "sms",
      });
      
      if (error) {
        console.error('Verification Error:', error);
        throw error;
      }
      
      console.log('OTP verification successful:', data);
      navigate("/");
    } catch (error: any) {
      console.error('Verification Error:', error);
      setError(error.message || 'Failed to verify code');
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