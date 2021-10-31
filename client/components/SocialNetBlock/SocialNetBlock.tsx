interface SocialNetBlockProps {
  size?: string;
  margin?: string;
  title: string;
  href: string;
  image: string;
}

const SocialNetBlock: React.FC<SocialNetBlockProps> = ({
  size = "10px",
  margin,
  title,
  href,
  image,
}) => {
  return (
    <div style={{ height: size, width: size, margin: margin }}>
      <a title={title} href={href} target="_blank" rel="noreferrer">
        <img
          src={image}
          alt={`Write via ${title}`}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
          }}
        />
      </a>
    </div>
  );
};

export default SocialNetBlock;
