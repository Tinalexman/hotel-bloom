import { useState, useEffect } from "react";

const RenderSvg: React.FC<{ svgString: string }> = ({ svgString }) => {
  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
};

// Example usage
const ExampleComponent: React.FC = () => {
  const [svgString, setSvgString] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the SVG string from the database
    const fetchSvg = async () => {
      const response = await fetch("/api/getIcon?name=example-icon");
      const data = await response.json();
      setSvgString(data.svg);
    };

    fetchSvg();
  }, []);

  if (!svgString) {
    return <div>Loading...</div>;
  }

  return <RenderSvg svgString={svgString} />;
};
