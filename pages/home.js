import React, { useState, useEffect } from "react";
import { withSession } from "../utils/withSession";
import { Box, Button, Text, IconButton } from "@chakra-ui/react";
import { supabase } from "../utils/supabaseClient";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import AddSubscriptionForm from "../components/AddSubscriptionForm";
import EditSubscriptionForm from "../components/EditSubscriptionForm";
import DeleteSubscriptionForm from "../components/DeleteSubscriptionForm";

function Home({ session }) {
  const [isShowingForm, setIsShowingForm] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isShowingEditForm, setIsShowingEditForm] = useState(false);
  const [isShowingDeleteForm, setIsShowingDeleteForm] = useState(false);

  useEffect(() => {
    const getSubscriptions = async () => {
      const { data, error } = await supabase.from("subscriptions").select();
      setSubscriptions(data);
    };
    getSubscriptions();
  }, []);

  return (
    <Box>
      <p>Add your subscription</p>
      <Button
        onClick={() => {
          setIsShowingForm(true);
        }}
      >
        +
      </Button>
      {isShowingForm ? (
        <AddSubscriptionForm
          session={session}
          onRequestHide={() => setIsShowingForm(false)}
        />
      ) : null}
      <Box>
        {subscriptions.map((el) => {
          return (
            <Box
              key={el.id}
              border="1px"
              borderColor="gray.100"
              overflow="hidden"
              minWidth="100px"
              maxWidth={["200px", "200px", "300px", "300px"]}
              minHeight="100px"
              borderRadius="md"
              padding="4"
              display="flex"
              justifyContent="space-between"
              alignContent="center"
            >
              <Box>
                <Text fontSize="xl">{el.name}</Text>
                <Text fontSize="sm">{el.description}</Text>
              </Box>
              <Text fontSize="xl">{el.amount}</Text>
              <Box>
                <IconButton
                  aria-label=""
                  icon={<AiOutlineEdit />}
                  variant="ghost"
                  size="sm"
                  colorScheme="orange"
                  onClick={() => setIsShowingEditForm(true)}
                />
                {isShowingEditForm ? (
                  <EditSubscriptionForm
                    session={session}
                    subscription={el}
                    onRequestHide={() => setIsShowingEditForm(false)}
                  />
                ) : null}
                <IconButton
                  aria-label=""
                  icon={<AiOutlineDelete />}
                  variant="ghost"
                  size="sm"
                  colorScheme="orange"
                  onClick={() => setIsShowingDeleteForm(true)}
                />
              </Box>
              {isShowingDeleteForm ? (
                <DeleteSubscriptionForm
                  session={session}
                  subscription={el}
                  onRequestHide={() => setIsShowingDeleteForm(false)}
                />
              ) : null}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default withSession(Home);
