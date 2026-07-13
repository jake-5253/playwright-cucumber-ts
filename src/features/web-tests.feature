Feature: Demo for Web-based Application

A short summary of the feature

@xraytest(123) @webapp @demo
Scenario Outline: Add product to cart and validate price
	Given user goes to landing page
	When user select a product "<productName>" from home page
	When user adds the product to cart
	When user opens the My Cart widget
	Then user validates product price on the cart widget
	Then user validates product name on the cart widget
Examples: Products
| productName |
| Grey jacket |
| Noir jacket |
| Striped top |

@xraytest(124) @webapp @smoke
Scenario: Add multiple products to cart and validate total
	Given user goes to landing page
	When user select a product "Grey jacket" from home page
	When user adds the product to cart
	When user opens the My Cart widget
	When product quantity are increased to "10"
	When user proceeds to check out from cart widget
	Then user validates total of the added products on the cart

@xraytest(125) @webapp @regression
Scenario: Fill in checkout information and complete order
	Given user goes to landing page
	When user select a product "Grey jacket" from home page
	When user adds the product to cart
	When user opens the My Cart widget
	When user proceeds to check out from cart widget
	When user proceeds to check out from cart
	And user fill in contact details "testmail@mail.com"
	And user fill in delivery details
		| Country | LastName | Address | PostalCode | City      |
		| NL      | lastName | address | 1071 NA    | Amsterdam |
	And user fill in payment details
	And user proceed to payment
	Then order must be completed
