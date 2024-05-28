import GitHubIcon from '@/icons/github-icon';

function GitHubLoginButton() {
  return (
    <button
      type="button"
      className="flex h-[60px] w-[400px] items-center justify-center gap-[20px] border-[1px] border-black text-[20px]"
    >
      <GitHubIcon />
      Continue with GitHub
    </button>
  );
}

export default GitHubLoginButton;
