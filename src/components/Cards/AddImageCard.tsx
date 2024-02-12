import { twMerge } from "tailwind-merge";
import ImageIcon from "../../assets/Icons/ImageIcon";
import { ImageGallery } from "../../types/global.types";

interface AddImageCard {
  setgalleryData: React.Dispatch<React.SetStateAction<ImageGallery[]>>;
}

const AddImageCard = ({ setgalleryData }: AddImageCard) => {
  return (
    <>
      <button
        type="button"
        className={twMerge(
          "rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-500 aspect-square p-8"
        )}
      >
        <ImageIcon />
        <p>Add Image</p>
      </button>
    </>
  );
};

export default AddImageCard;
