

const AuthLayout = ({ children }) => {
  
  return (
    <>
      <div className="h-screen host-bg flex justify-center items-center">
          <div className="w-110 h-auto sub-bg flex flex-col items-center justify-around rounded-3xl p-8 shadow-lg">
            {children}
          </div>
        </div>
    </>
  );
};
export default AuthLayout;
