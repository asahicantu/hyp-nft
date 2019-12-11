# hlf1.4-supply-chain
Supply chain proof of concept in Hyperledger Fabric. Network with four companies and a specific chaincode exposed as rest API

# Installation instructions

1. Install Hyperledger fabric dependencies:
https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html

2. Donwload fabric binaries and samples:
`curl -sSL http://bit.ly/2ysbOFE | bash -s 1.4.3`

3. Go to fabric samples:
`cd fabric-samples`

4. Download the template:
`git clone https://github.com/ialberquilla/hlf1.4-supply-chain`

6. Go to 
`hlf1.4-supply-chain`

5. Install node-js dependencies
`./network.sh install`



# Start the network
1. Generate the crypto material and start the network
`./network.sh start`
This will create the crypto material for all the orgs, start the network and register it's admins and users. Then will start the API at localhost:3000


# Re-start the API server
`npm start`

# Stop the network
`./network.sh stop`


# API Doc
**AddTuna**
----
  Add new Tuna to the blockchain network

* **URL**

  /api/addTuna

* **Method:**
  
	`POST` 

* **Data Params**

  {
	"id":integer,
	"latitude":integer,
	"longitude":integer,
	"length":integer,
	"weight":integer
  }

* **Success Response:**
  
  {
    "result": {
        "id": 10005,
        "latitude": 16,
        "longitude": 300,
        "length": 34,
        "weight": 50
    }
}
 
* **Sample Call:**

  curl --request POST \
  --url http://localhost:3000/api/addTuna \
  --header 'content-type: application/json' \
  --data '{
			"id":"10004",
			"latitude":"16",
			"longitude":"300",
			"length":34,
			"weight":50
			}'
