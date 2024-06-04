'use client';

import GitHubIcon from '@/icons/github-icon';

function GitHubLoginButton() {
  const login = () => {
    window.location.assign(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/github`);
  };

  return (
    <button
      type="button"
      className="flex h-[60px] w-[400px] items-center justify-center gap-[20px] border-[1px] border-black text-[20px]"
      onClick={login}
    >
      <GitHubIcon />
      Continue with GitHub
    </button>
  );
}

export default GitHubLoginButton;
