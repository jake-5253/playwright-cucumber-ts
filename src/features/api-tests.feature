Feature: Demo for API-based integration

A short summary of the feature

@xraytest(126) @api @todo
Scenario: API Test sample
	Given I have the API endpoint "/checkout"
	When I send a GET request to the endpoint
	Then I should receive a response with status code 200