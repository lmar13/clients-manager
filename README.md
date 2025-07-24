# Client Manager

## Table of Contents

- [Client Manager](#client-manager)
  - [Table of Contents](#table-of-contents)
  - [Project Information](#project-information)
  - [Demo](#demo)
    - [GitHub](#github)
    - [Hosting](#hosting)
  - [Local version](#local-version)
    - [Requirements](#requirements)
    - [Install deps](#install-deps)
    - [Development environment](#development-environment)
    - [Testing locally](#testing-locally)
    - [Docs locally](#docs-locally)
  - [TODO List](#todo-list)
  - [✅ Cel](#-cel)
  - [✅ Struktura aplikacji](#-struktura-aplikacji)
    - [Strona główna](#strona-główna)
    - [Strona dodawania danych](#strona-dodawania-danych)
  - [✅ Kroki formularza](#-kroki-formularza)
    - [Krok 1: Dane podstawowe](#krok-1-dane-podstawowe)
    - [Krok 2: Zainteresowania](#krok-2-zainteresowania)
    - [Krok 3: Podsumowanie](#krok-3-podsumowanie)
  - [✅ Technologie i wymagania](#-technologie-i-wymagania)
  - [✅ Dodatkowe wymagania](#-dodatkowe-wymagania)

## Project Information

- **Name:** Clients Manager
- **Description:** A simple Angular application for managing clients.
- **Technologies:** Angular, Angular Material, NgRx, Reactive Forms
- **Deployment:** Hosted on Netlify with a custom domain.
- **Database:**  Hosted on Neon (PostgreSQL), and connected with Netlify via plugin. Uses Drizzle ORM with SQLite for data management.
- **Netlify Functions:** Used for serverless functions to handle backend logic.
- **RWD Support:** Landscape view for better readability of the client table.

Note: Project is hard to test locally due to the need for a database connection. It uses Drizzle ORM with SQLite and Netlify Dev for local development (https://docs.netlify.com/cli/get-started/#install-the-netlify-cli). Without a proper database setup, some features may not work as expected.

## Demo

### GitHub

Repository URL: https://github.com/lmar13/clients-manager

### Hosting

Remote URL -> [cmanager.lmarciniak.xyz](https://cmanager.lmarciniak.xyz/) -> hosted app on netlify and redirected to my subdomain

## Local version

### Requirements
- Node.js (>=18)
- Netlify CLI (`npm install -g netlify-cli`)

### Install deps

Before running app locally, You should install dependencies:

```bash
npm install
```

### Development environment

To start a local version of app, run. `PROVIDED_AUTH_TOKEN` should be replaced with token provided by email:

```bash
netlify dev --auth=PROVIDED_AUTH_TOKEN
```

Once the server is running, open your browser and navigate to `http://localhost:8888/`

### Testing locally

To run test locally, run:

```bash
npm run test
```

### Docs locally

To show documentation locally, run:

```bash
npm run docs:serve
```

Once the server is running, open your browser and navigate to `http://127.0.0.1:8080`.

## TODO List

## ✅ Cel

Stwórz prostą aplikację w Angularze składającą się z dwóch głównych widoków:

- [x] **Strona główna** – wyświetla tabelę z danymi klientów.
- [x] **Strona dodawania danych** – umożliwia dodanie nowego klienta w formie wieloetapowego formularza.

---

## ✅ Struktura aplikacji

### Strona główna

- [x] Wyświetla listę klientów w formie tabeli (użyj Angular Material Table).
- [x] Dane mogą być przechowywane i pobierane w pamięci przeglądarki lub API (jak masz czas).
- [x] Tabela powinna umożliwiać:
  - [x] sortowanie,
  - [x] filtrowanie

### Strona dodawania danych

- [x] Formularz podzielony na 3 kroki z możliwością:
  - [x] przechodzenia do kolejnych kroków,
  - [x] wracania do poprzednich kroków.
- [x] Wykorzystaj Angular Material Stepper (MatStepper) oraz NgRx.
- [x] Dane z poszczególnych kroków powinny być przechowywane w formularzu (Reactive Forms).

---

## ✅ Kroki formularza

### Krok 1: Dane podstawowe

- [x] Imię (pole wymagane)
- [x] Nazwisko (pole wymagane)
- [x] Numer telefonu (pole wymagane, walidacja na numer telefonu)

### Krok 2: Zainteresowania

- [x] Dynamiczna lista zainteresowań (możliwość dodawania/usuwania pól).

### Krok 3: Podsumowanie

- [x] Wyświetlenie wszystkich wprowadzonych danych w formie podsumowania.
- [x] Przycisk „Zapisz” zapisuje dane do: NgRx Store oraz/lub localStorage.

---

## ✅ Technologie i wymagania

- [x] Angular (ostatnia stabilna wersja)
- [x] Angular Material (UI komponenty + MatStepper)
- [x] Reactive Forms (walidacje, dynamiczne pola)
- [x] NgRx (zarządzanie stanem aplikacji – lista klientów)
- [x] Angular Router (nawigacja między stronami)

## ✅ Dodatkowe wymagania

- [x] Lazy loading
- [x] Custom phone validator
- [x] Tests
- [x] Effect and error handling
- [x] Widok landscape dla RWD (w portrait ciężko jest czytać tabelę)
