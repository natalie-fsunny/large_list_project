import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { User } from "../types";
import { Form } from "./Form";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  handleSaveChanges: () => void;
  handleCancelChanges: () => void;
  title: string;
}

export const CustomModal = ({
  handleCancelChanges,
  handleSaveChanges,
  isOpen,
  onClose,
  userState,
  setUserState,
  title,
}: CustomModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="360px">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form userState={userState} setUserState={setUserState} />
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            mr={3}
            onClick={handleSaveChanges}
            colorScheme="blue"
          >
            Save
          </Button>
          <Button size="sm" colorScheme="red" onClick={handleCancelChanges}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
