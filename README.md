# Proyecto final
Justo lo que buscabas.
### Version 0.1.0 - 2022/02/12

## Initial Config to proyect

1. git clone [repository_path]
2. npm i
3. config settings.json based in example settings.json.example
4. run migrates with command "knex migrate:latest"
5. run seaders with command "knex seed:run"
6. compile the proyect with command "npm run dev"
7. Enjoy! °----°

# Server Configuration

The settings are loaded from a file which must be called "settings.json" and placed in "src/Server/".

## Example of the settings file "settings.json"

```
{
	"settings" : {
		"server_url" : "http://localhost:3000",
		"purchasing" : {
			"disable_average_cost_calculation" : false
		}
	},
	"admin" : {
		"username"     : "root",
		"password"     : "root",
		"email"        : "root@gmail.com",
		"employeeInfo" : {
			"first_name" : "pepe",
			"last_name"  : "chuy"
		}
	},
	"database" : {
		"host"     : "localhost",
		"port"     : 3306,
		"user"     : "root",
		"password" : "root",
		"database" : "zoko_db",
		"charset"  : "utf8",
		"pooling" : {
			"minimum" : 1, 
			"maximum" : 100
		},
		"connectionTimeout" : 10000
	},	
	"security" : {
		"jwt_key"    : "zoko_key_2020",
		"token_life" : "7 days",
		"ssl" : {
			"key_file"  : "/home/ssl/cert.key",
			"cert_file" : "/home/ssl/cert.crt",
			"enable"    : false
		},
		"disable_session_control" : true
	},
	"mail": {
		"user"             : "contacto@email.com",
		"pass"             : "123456789",
		"SENDGRID_API_KEY" : "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"
	},
	"debug" : true
}
```


# Routes

The API REST is organized as a set of modules and submodules, the route is formed by the name of the module follwed by the submodule(s) and last the specific actions or params.

**FORMAT: _< protocol >://< domain >/api/< module >[[/< submodule >[/< sub-submodule >]]][/< :param1 >[/< :param2 >]]_**
 
 * e.g. **http://my_domain.org/api/products/presentations/page/1** Brings a page of product presentations.

Generally the modules will have CRUD routes
 * **POST:** Additions:
  * Add one register uses _/api/< module >[/< submodule >[/< sub-submodule >]]/_.
 * **GET:** Consults:
  * Obtain all the available registers uses _/api/< module >[/< submodule >[/< sub-submodule >]]/_ (Just a few modules have this feature).
  * Get one specific register uses _/api/< module >[/< submodule >[/< sub-submodule >]]/:id_.
  * Get a page of registers uses _/api/< module >[/< submodule >[/< sub-submodule >]]/page/:page_.
 * **PATCH:** Updates:
  * Update one single register uses _/api/< module >[/< submodule >[/< sub-submodule >]]/:id_.
 * **DELETE:** Deletions:
  * Delete one single register uses _/api/< module >[/< submodule >[/< sub-submodule >]]/:id_.

The available modules are the following:

 1. Auth
 2. Users
 2. Customers
 3. Employees
 4. Provider
 5. Info
 6. Products
 7. Files
 8. Buy Orders

## I. Auth

 1. Login **GET .../api/auth**

## II. Users

 1. Edit a User register **PATCH .../api/users/edit**
 2. Rate a User **POST .../api/users/rate**
 3. Delete a User **POST .../api/users/delete**

## III. Customers

 1. Get a page of customers **GET .../api/customers/page/:page**
 2. Add new register for customer **POST .../api/customers/create/**
 3. Edit a customer register **PATCH .../api/customers/edit**
 4. Get a record if a specific customer **GET .../api/customers/details/:id**

## Customer Address

 1. Get a page of customer address **GET .../api/customers/addresses/page/:page**
 2. Add new register for customer address **POST .../api/customers/addresses/create/**
 3. Edit a customer address register **PATCH .../api/customers/addresses/edit**
 4. Get a record if a specific customer address **GET .../api/customers/addresses/details/:id**

## Billing Profiles

 1. Get a page of billing profiles **GET .../api/customers/billing_profiles/page/:page**
 2. Add new register for billing profiles **POST .../api/customers/billing_profiles/create/**
 3. Edit a billing profiles register **PATCH .../api/customers/billing_profiles/edit**
 4. Get a record if a specific billing profiles **GET .../api/customers/billing_profiles/details/:id**

## Customer Emails

 1. Edit a batch emails registers **PATCH .../api/customers/emails/edit**
 1. Get all mailer custom config **GET .../api/customers/emails/:customerId**

## IV. Employees

 1. Get a page of employees **GET .../api/employees/page/:page**
 2. Add employe **POST .../api/employees/create/**
 3. Edit a employee register **PATCH .../api/employees/edit**
 4. Get a record if a specific employee **GET .../api/employees/details/:id**

## Employee Has Providers

 1. Link provider to employe  **POST .../api/employees/providers/link**
 2. Unlink provider to employe  **DELETE .../api/employees/providers/unlink**

## IV. Providers

 1. Get a page of providers **GET .../api/providers/page/:page**
 2. Add new register for provider **POST .../api/providers/create/**
 3. Edit a Provider register **PATCH .../api/providers/edit**
 4. Get a record of a specific provider **GET .../api/providers/details/:id**

## Providers has products

 1. Register a variety of product to a supplier  **POST .../api/providers/products/:providerId/create**
 2. Edit registration of a specific product that belongs to a supplier  **PATCH .../api/providers/products/:providerId/edit**
 3. Config one or more variety registration of a specific product that belongs to a supplier  **PATCH .../api/providers/products/:providerId/config**
 4. Active all product varieties of a specific product that belongs to a supplier  **PATCH .../api/providers/products/:providerId/active**
 5. Edit a registration of a lote product that belongs to a supplier  **PATCH .../api/providers/products/:providerId/edit_batch_products**
 6. Get a registration of a specific product that belongs to a supplier **PATCH .../api/providers/products/:providerId/details/:id**

## Providers has shipping profiles

 1. Get a all shipping profiles **GET .../api/providers/shipping_profiles/get_all**
 2. Edit a shipping profiles  **PATCH .../api/providers/shipping_profiles/edit**

## Providers history payments

 1. Get a page payments **GET .../api/providers/history_payments/page/:page**

## Subscriptions

 1. Change Subscription **PATCH .../api/providers/subscriptions/change_subscription**
 2. Cancel Subscription **PATCH .../api/providers/subscriptions/cancel**

## V. Info

 1. Get a page of states **GET .../api/info/states/page/:page**
 2. Get a page of cities **GET .../api/info/cities/page/:page**
 3. Get a page of subscriptions **GET .../api/info/subscriptions/page/:page**

## VI Products

 1. Add new request for a new product **POST .../api/products/create**
 2. Edit a record of a specific product **PATCH .../api/products/edit**
 3. Get a page of product details **GET .../api/products/page/:page**
 4. Get a record if a specific product changes history **GET .../api/products/details/:id**
 5. Like a product **POST ...api/products/like**
 5. Dislike a product **DELETE ...api/products/dislike**

## Categories
 
 1. Add new category **POST .../api/products/category/create**
 2. Get a page of categories **GET .../api/products/categories/page/:page**

## Change History

 1. Get a page of product changes history **GET .../api/products/change_history/page/:page**
 2. Get a record of a specific product changes history **GET .../api/products/change_history/details/:id**
 3. Approve a specific product changes history **GET .../api/products/change_history/approve**
 4. Rejecte a specific product changes history **GET .../api/products/change_history/reject**

## Features

 1. Get a page of features **GET .../api/products/features/page/:page**
 2. Add new feature **POST .../api/products/feature/create**

## VII Files

 1. Get an image user or product **GET .../api/images/:category/:sizeOrId/:id**
 1. Get an file **GET .../api/files/:fileId**

## VIII

 1. Make a place Order **POST .../api/orders/place**
 2. Get a record of a specific Buy Order **POST .../api/orders/details/:idOrCode**

### Sale Orders

 1. Get a page of a sale orders **GET .../api/orders/sale_orders/page/:page**
 2. Change status of a sale order **PATCH .../api/orders/sale_orders/change_status**
 3. Upload file related to sale order **POST .../api/orders/sale_orders/upload_file**



## TDD (Test Driven Development)
Esta aplicación está basada en los **test**, nada puede ir a producción si no tiene su respectivo test

### ¿Cómo hacer un test?
Hay 5 preguntas que todos los test deverían ser capaces de responder:

1. ¿Qué es lo que se está probando? *(Módulo, función, clase...)*
2. ¿Qué debería de hacer? *(Descripción en Prosa)*
3. ¿Cuál es el **output**?
4. ¿Cuál es el **output esperado**?
5. ¿Cómo se puede reproducir un error?

Siempre hay que recordar que
> Simple tests are better tests. (Pruebas pequeñas, son mejores pruebas)

Cuando hablamos de **Unit Testing** nos referimos a las pruebas que hacemos sobre una unidad pequeña de código de nuestra aplicación, un componente, una función, etc. las cuales tienen que estar isoladas.

Cuando nuestro código a analizar depende de una librería, se le llama **Integration Tests**, se refiere a aquellas pruebas más complejas que requieren de depenedencias

Cuando analizamos toda la aplicación como tal, se le conoce como **End-to-End (E2E) Tests**, y pueden incluir: comprobar que la aplicación se renderice correctamente, que el **Performance** no baje de 90%, etc.

#### Testing Setup
Para el uso de **Tests**, necesitamos de algunas herramientas que nos puedan facilitar la tarea, de las que necesitaremos:

|   | Test Runner | Assertion Library | Headless Browser |
| - | ----------- | ----------------- | ---------------- |
| ¿Que es? | *Ejecuta los test y nos da los resultados* | *Define la lógica de testing la cual está basada en condiciones* | *Simula la interacción con el navegador* |
| E.g. | **Mocha** | **Chai** | **Puppeteer** |
| Usadas en | Unit + Integration | Unit + Integration | E2E |

Para *Headless Browser* y **E2E**, usaremos [*Lighthouse*](https://web.dev/measure/?gclid=Cj0KCQiAtOjyBRC0ARIsAIpJyGP98dHqMOw_hrmduuspKv1OETVslWMAFU-Ot0szq9Aw1gNQ6REAJOwaAgu-EALw_wcB) para comprobar que el **Rendimiento**, **Accesibilidad**, **Mejores Prácticas** y el **SEO** hagan de esta, una excelente aplicación. **Lighthouse** correrá sus *audits* de forma automática, nosotros solamente 

