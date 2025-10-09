import {useState} from 'react';
import readFile from "../utils/readFile";
import getMime from "../utils/getMime";
import Toast from "../utils/toast";
import config from "../config";
import {useApp} from "store/contexts/app-context";
import useQueryAsync from "hooks/use-query-async";

const useUpload=()=>{
	const [success,setSuccess] = useState(false);
	const [loading,setLoading] = useState(false);
	const [error,setError] = useState(false);
	const {auth} = useApp();
	const query = useQueryAsync();

	const upload=async (file:string, type:'Passport'|'NIN'|'ID'|'UB')=>{
		setLoading(true)
		const string = await readFile(file)
		const mime = getMime(file.split(".").reverse()[0])

		const data = {
			fileType:type,
			encodedString: `data:${mime};base64,${string}`
		}

		fetch(`${config.baseUrl}/UploadDocs/${auth.customerId}`, {
			method:"POST",
			headers:{
				"Accept": 'application/json',
				"Content-Type": 'application/json',
                "Auth_IDToken": auth.accessToken
			},
			body: JSON.stringify(data)
		}).then(async (response) =>{
			return {
				data: response.json().catch(()=>{}),
				status:response.status
			}
		}).then((res:any)=>{
			console.log(res);
			setLoading(false)
			if (res.status===200){
				setSuccess(true)
				query("getCustomer")
			}else {
				setError(true)
				Toast("Oops! an error occurred, kindly try again")
			}
		}).catch((e)=>{
			setLoading(false)
			setError(true)
			Toast("Oops! an error occurred, kindly try again")
		})
	};

    return {
	    upload,
	    success,
	    loading,
	    error,
    };
}

export default useUpload;
