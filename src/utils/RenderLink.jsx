const renderLink = (href, text) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline"
      key={href}
    >
      {text}
    </a>
  );
};

export default renderLink;
