interface TagProps {
  name: string;
}

const Tag = ({ name }: TagProps) => {
  return (
    <div className="bg-muted p-2 text-xs rounded-md">
      <p>{name}</p>
    </div>
  );
};

export default Tag;
