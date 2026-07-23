Feature: Demo for Web-based Application

# A short summary of the feature

Background:
	Given user logs in to Sauce Demo page

@xraytest(111) @webapp @saucedemo
Scenario: Sauce Demo assessment
	Then user verifies that products are listed on the landing page
	And user verifies that the products listed are more than "1"
	When user adds the following products to the cart
		| productName 			|
		| Sauce Labs Backpack	|
		| Sauce Labs Bike Light |
	Then user verifies that cart badge count is "2"
	When user goes to the cart page
	Then user verifies that the cart contains the following products and price
		| productName 			|
		| Sauce Labs Backpack	|
		| Sauce Labs Bike Light |
	When user removes "Sauce Labs Bike Light" from the cart
	And user proceeds to checkout
	And user fills in payment information and continues
		| firstName | lastName | postalCode |
		| John 		| Doe	   | 0001 		|
	Then the checkout page was properly displayed
	Then the checkout process is completed