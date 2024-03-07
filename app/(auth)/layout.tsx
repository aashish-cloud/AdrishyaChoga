import { Logo } from "./_components/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">      
      {children}
      <div className="rounded flex flex-1">
        <img src="/empty.png" className="object-contain" alt="" />
      </div>
    </div>
  );
};

export default AuthLayout;