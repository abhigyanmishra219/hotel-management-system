"use client"
import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";



export default function UpdateUser({ id }: { id: Promise<{ id: string }> })
{
	
    const [role, setrole] = useState("staff")
	const [name, setname] = useState("")
	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")

		async function fecthuser()
		{
			const res=await fetch(`http://localhost:3000/api/member/${id}`)
			const data=await res.json();
			   console.log("API Response:", data);
			if(data.success && data.user)
			{
				setname(data.user.name)
				setemail(data.user.email)
				setpassword(data.user.password)
				setrole(data.user.role || "staff")
			
			}
		}
		async function handleupdate()
		{
           const res=await fetch(`http://localhost:3000/api/member/${id}`,{
			method :"POST",
			body:JSON.stringify({name,email,password,role})
		   });
		   const d=await res.json();
    if(d.success)
    {
      toast("Update Done")
      redirect("/")
    }
  }
		
	
    return(
        <Dialog.Root>
	<Dialog.Trigger>
		<Button onClick={fecthuser}>Edit profile</Button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		<Dialog.Title>Edit profile</Dialog.Title>
		<Dialog.Description size="2" mb="4">
			Make changes to your profile.
		</Dialog.Description>

		<Flex direction="column" gap="3">
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Name
				</Text>
				<TextField.Root
					value={name}
					onChange={(e)=>setname(e.target.value)}
					
				/>
			</label>
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Email
				</Text>
				<TextField.Root
						value={email}
					onChange={(e)=>setemail(e.target.value)}
					
				/>
			</label>
            <label>
				<Text as="div" size="2" mb="1" weight="bold">
					Pasword
				</Text>
				<TextField.Root
						value={password}
					onChange={(e)=>setpassword(e.target.value)}
					
				/>
			</label>
            <Select.Root value={role} onValueChange={(value)=>setrole(value)}>
                                         <Text as="div" size="2" mb="1" weight="bold">
                                            Role
                                        </Text>
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Group>
                                    <Select.Label>Role</Select.Label>
                                    <Select.Item value="receptionist">Receptionist</Select.Item>
                                    <Select.Item value="staff">Staff</Select.Item>
                                    <Select.Item value="manager">Manager</Select.Item>
                                </Select.Group>
                                <Select.Separator />
                                
                            </Select.Content>
                        </Select.Root>
		</Flex>

		<Flex gap="3" mt="4" justify="end">
			<Dialog.Close>
				<Button variant="soft" color="gray">
					Cancel
				</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button onClick={handleupdate}>Save</Button>
			</Dialog.Close>
		</Flex>
	</Dialog.Content>
</Dialog.Root>

    )
}