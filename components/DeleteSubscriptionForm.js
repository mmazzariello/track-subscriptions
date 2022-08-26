import React from "react";
import { supabase } from "../utils/supabaseClient";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

const DeleteSubscriptionForm = ({
  session,
  subscription,
  onRequestHide,
  onSaveSuccessfull,
}) => {
  const handleDeleteSubscription = async () => {
    const { data, error } = await supabase
      .from("subscriptions")
      .delete()
      .match({ id: subscription.id, user_id: session.user.id });

    if (!error) {
      onRequestHide();
      onSaveSuccessfull();
    }
  };

  return (
    <Modal isOpen={true} onClose={onRequestHide}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Subscription</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want delete subscription?</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onRequestHide}>
            No
          </Button>
          <Button variant="ghost" onClick={handleDeleteSubscription}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteSubscriptionForm;
