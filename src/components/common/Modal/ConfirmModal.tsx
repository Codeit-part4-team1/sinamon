import { MdCheckCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";

interface ConfirmModalProps {
  text: string;
  status: string;
}

const ConfirmModal = ({ text, status }: ConfirmModalProps) => {
  return (
    <div>
      <div className="flex flex-col justify-center gap-1 text-center">
        <div className="flex justify-center">
          {status === "success" ? (
            <MdCheckCircle size={25} color="#531" />
          ) : (
            <MdCancel size={25} color="#531" />
          )}
        </div>
        <p className="h-[100px] flex justify-center items-center">{text}</p>
      </div>
    </div>
  );
};

export default ConfirmModal;
