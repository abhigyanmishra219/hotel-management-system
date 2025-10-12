"use client"
import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { toast } from "sonner";

export default function AddRoom()
{
    const [RoomNumber, setRoomNumber] = useState("")
    const [status, setstatus] = useState("available")
    const [bed, setbed] = useState("single")
    const [AC, setAC] = useState("without")
    const [Rent, setRent] = useState("")
    async function  handleAdd()
    {
        const Room={
            RoomNumber,
            status,
            bed,
            AC,
            Rent,
        };
        try{
          const response=await fetch("http://localhost:3000/api/Room",{
            method:"POST",
            body:JSON.stringify(Room)
          });
          const data=await response.json()
          if(data.success)
          {
            toast("Room Addede Successfully")
            setRoomNumber("")
            setRent("")
          }
        }
        catch(error:unknown)
        {
            console.error("error in adding",error)
        }
    }
    return(
        <>
          <Dialog.Root>
	<Dialog.Trigger>
		<Button>Add Room</Button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		<Dialog.Title>Add Rooms</Dialog.Title>
		<Dialog.Description size="2" mb="4">
			
		</Dialog.Description>

		<Flex direction="column" gap="3">
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Room Number
				</Text>
				<TextField.Root
                    value={RoomNumber}
                    onChange={(e)=>setRoomNumber(e.target.value)}
					placeholder="Enter Room Number"
				/>
			</label>
          
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

<Select.Root value={bed} onValueChange={(value)=>setbed(value)}>
    <Text as="div" size="2" mb="1" weight="bold">
					Bed type
				</Text>
	<Select.Trigger />
	<Select.Content>
		<Select.Group>
			<Select.Label>Bed</Select.Label>
			<Select.Item value="single">Single</Select.Item>
			<Select.Item value="double">Double</Select.Item>
			<Select.Item value="triple">Triple</Select.Item>
		</Select.Group>
		<Select.Separator />
		
	</Select.Content>
</Select.Root>
      <Select.Root value={AC} onValueChange={(value)=>setAC(value)}>
    <Text as="div" size="2" mb="1" weight="bold">
					AC type
				</Text>
	<Select.Trigger />
	<Select.Content>
		<Select.Group>
			<Select.Label>AC</Select.Label>
			<Select.Item value="with">With AC</Select.Item>
			<Select.Item value="without">Without AC</Select.Item>
		</Select.Group>
		<Select.Separator />
		
	</Select.Content>
</Select.Root>
<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Room Rent
				</Text>
				<TextField.Root
                    value={Rent}
                    onChange={(e)=>setRent(e.target.value)}
					placeholder="Enter Rent Amount"
				/>
			</label>
		</Flex>

		<Flex gap="3" mt="4" justify="end">
			<Dialog.Close>
				<Button variant="soft" color="gray">
					Cancel
				</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button onClick={handleAdd}>Save</Button>
			</Dialog.Close>
		</Flex>
	</Dialog.Content>
</Dialog.Root>

        </>
    )
}