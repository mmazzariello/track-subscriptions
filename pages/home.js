import React, { useState, useEffect, useCallback } from "react";
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
  const [totalAmount, setTotalAmount] = useState(false);

  const fetchSubscriptions = useCallback(async () => {
    const { data, error } = await supabase.from("subscriptions").select();
    setSubscriptions(data);
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    let totalAmountsPerMonth = 0;

    subscriptions.map((el) => {
      const amountEl = el.amount;
      if (el.cycle == "monthly") {
        totalAmountsPerMonth += amountEl;
      }
    });

    setTotalAmount(totalAmountsPerMonth);
  }, [subscriptions]);

  return (
    <Box display="flex" height="100vh" flexDirection="column">
      <Box display="flex">
        <p>Add your subscription</p>
        <Button
          onClick={() => {
            setIsShowingForm(true);
          }}
        >
          +
        </Button>
      </Box>
      {isShowingForm ? (
        <AddSubscriptionForm
          session={session}
          onRequestHide={() => setIsShowingForm(false)}
          onSaveSuccessfull={() => fetchSubscriptions()}
        />
      ) : null}
      <Box display="flex">
        {subscriptions.map((el) => {
          return (
            <Box
              key={el.id}
              border="1px"
              borderColor="gray.100"
              overflow="hidden"
              minWidth="100px"
              width={["200px", "200px", "300px", "300px"]}
              minHeight="100px"
              margin="4px"
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
                    onSaveSuccessfull={() => fetchSubscriptions()}
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
                  onSaveSuccessfull={() => fetchSubscriptions()}
                />
              ) : null}
            </Box>
          );
        })}
      </Box>
      <Box flexGrow="1"></Box>

      <Box
        borderTop="1px"
        borderColor="gray.100"
        padding="4"
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
      >
        <Text fontSize="xs" as="b" color="gray.700">
          AVERAGE
        </Text>
        <Text fontSize="xs" color="gray.500">
          PER MONTH:
          <Text as="b"> {totalAmount}</Text>
        </Text>
      </Box>
    </Box>
  );
}

export default withSession(Home);
