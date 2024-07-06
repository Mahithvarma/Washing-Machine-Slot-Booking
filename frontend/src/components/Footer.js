import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-gray-800 text-white p-6">
      <footer>
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center border-b border-gray-600 pb-4 mb-4">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl font-bold">MM BOYS</h1>
            <p className="text-2xl font-light">Washing Machine</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Contribute Us</h2>
            <ul className="flex space-x-4">
              <li className="flex items-center space-x-2 hover:text-gray-400">
                <GitHubIcon />
                <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <p>&copy; {year} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
