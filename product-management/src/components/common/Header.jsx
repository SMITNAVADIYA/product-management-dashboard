import Button from "./Button";

const Header = ({ title, subTitle, description, onClick }) => {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-500">
          {title}
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {subTitle}
        </h1>

        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>

      <Button onClick={onClick}>
        <span className="text-lg leading-none">+</span>
        Add Product
      </Button>
    </div>
  );
};

export default Header;
