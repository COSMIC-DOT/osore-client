'use client';

import GoogleIcon from '@/icons/google-icon';

function GoogleLoginButton() {
  const login = () => {
    window.location.assign(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google`);
  };

  return (
    <button
      type="button"
      className="text-body1 flex h-[60px] w-[400px] items-center justify-center gap-[20px] rounded-[24px] bg-gray0 shadow-[0_0_30px_rgba(0,0,0,0.05)] hover:bg-primary_light active:bg-primary active:text-white"
      onClick={login}
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
}

export default GoogleLoginButton;
