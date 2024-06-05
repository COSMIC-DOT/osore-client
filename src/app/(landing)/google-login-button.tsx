import GoogleIcon from '@/icons/google-icon';

function GoogleLoginButton() {
  return (
    <button
      type="button"
      className="text-body1 flex h-[60px] w-[400px] items-center justify-center gap-[20px] rounded-[24px] bg-white"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
}

export default GoogleLoginButton;
