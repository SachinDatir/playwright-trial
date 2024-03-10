import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'
test('Api testing in playwright GET request', async ({ request }) => {
    const arr:[] = []
    const newIssue = await request.get(`https://reqres.in/api/users?page=2`, {
    //   data: {
    //     title: '[Bug] report 1',
    //     body: 'Bug description',
    //   }
    })
    expect(await newIssue.ok()).toBeTruthy();
    expect(await newIssue.status()).toEqual(200);
    const res:any = await newIssue.json()
    console.log(res.data[0].email)

    
})

test('test api POST request in playwrigth',async({request,page})=>{
    const name = faker.internet.displayName()
    const job = faker.lorem.words(2)
    const updatedName = faker.internet.displayName()
    const updatedJob = faker.lorem.words(2)
    const postRequest = await request.post(`https://reqres.in/api/users`,{
        data:{
            "name": name,
            "job": job,
            "country":"India"
        }
    })
    expect(await postRequest.status()).toEqual(201)
    // expect(await postRequest.body)
    const res = await postRequest.json()
    expect(await res.name).toEqual(name)
    expect(await res.job).toEqual(job)
    expect(await res.country).toEqual("India")
     const id =  res.id
     console.log(await id)
     const putRequest = await request.post(`https://reqres.in/api/users${id}`,{
        data:{
            "name": updatedName,
            "job": updatedJob,
            "country":"Bharat"
        }
    })
    // console.log(await putRequest.json())
    expect(await putRequest.status()).toEqual(201)
    // expect(await postRequest.body)
    const resOne = await putRequest.json()
    expect(await resOne.name).toEqual(updatedName)
    expect(await resOne.name).not.toEqual(name)
    expect(await resOne.job).toEqual(updatedJob)
    expect(await resOne.country).toEqual("Bharat")
    const putRequestId = resOne.id
    const deleteRequest = await request.delete(`https://reqres.in/api/users/${putRequestId}`,{

    })
    await expect(deleteRequest.status()).toEqual(204)
    // console.log(await deleteRequest.json())
})

test.only('api rest',async({request})=>{
 await request.get(`https://reqres.in/api/users`).then(async (res)=>{
    console.log(await res.json())
 })

})

