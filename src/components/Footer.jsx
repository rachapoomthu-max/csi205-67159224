
const Footer = () => {
  return (
    <footer className="bg-danger text-primary-foreground py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* ซ้าย: ข้อมูลมหาวิทยาลัย */}
          <div className="text-center md:text-left">
            <p className="font-semibold text-lg">มหาวิทยาลัยศรีปทุม</p>
            <p className="text-sm text-primary-foreground/80">
              คณะเทคโนโลยีสารสนเทศ | สาขาวิชาเทคโนโลยีสารสนเทศ
            </p>
            <p className="text-sm text-primary-foreground/80">© 2025 All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

