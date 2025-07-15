const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} MERN Blog. All rights reserved.</p>
        <p className="mt-2 text-purple-200">
          Built with React, Express, Node.js, and MongoDB
        </p>
      </div>
    </footer>
  );
};

export default Footer;