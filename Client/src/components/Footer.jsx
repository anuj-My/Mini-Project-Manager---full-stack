export default function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-auto">
      <div className="container mx-auto px-6 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Mini Project Manager. All rights
        reserved.
      </div>
    </footer>
  );
}
