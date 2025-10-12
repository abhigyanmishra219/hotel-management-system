"use client"
import { Button, Dialog, Flex, Select, Text } from "@radix-ui/themes";
import { useState } from "react";
import { toast } from "sonner";
type CheckoutProps=
{
    id:string
}
export default function Checkout({id}:CheckoutProps)
{
    const [status, setstatus] = useState("available")
    async function handleCheckout()
    {
        try{
          const res=await fetch("/api/checkout",
            {
                method:"POST",
                body:JSON.stringify({roomId:id}),
            }
          );
          const data=await res.json()
          if(data.success)
          {
            toast("Checked out ")
          }
          else
          {
            toast("something went wrong")
          }
        }
        catch(error)
        {
            console.log("error in check out",error)
        }
    }
    return(
        <>
        <Dialog.Root>
	<Dialog.Trigger>
		<Button>Check Out</Button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		
           <Select.Root value={status} onValueChange={(value)=>setstatus(value)}>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Status
                        </Text>
            <Select.Trigger />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Status</Select.Label>
                    <Select.Item value="available">Available</Select.Item>
                    <Select.Item value="booked">Booked</Select.Item>
                    <Select.Item value="maintenance">Maintenance</Select.Item>
                </Select.Group>
                <Select.Separator />
                
            </Select.Content>
           </Select.Root>
		<Flex direction="column" gap="3">
		</Flex>
		<Flex gap="3" mt="4" justify="end">
			<Dialog.Close>
				<Button variant="soft" color="gray">
					Cancel
				</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button onClick={handleCheckout}>Save</Button>
			</Dialog.Close>
		</Flex>
	</Dialog.Content>
</Dialog.Root>

        </>
    )
}