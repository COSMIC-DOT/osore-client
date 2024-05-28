import GoogleIcon from '@/icons/google-icon';

function GoogleLoginButton() {
  return (
    <button
      type="button"
      className="flex h-[60px] w-[400px] items-center justify-center gap-[20px] border-[1px] border-black text-[20px]"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
}

export default GoogleLoginButton;
