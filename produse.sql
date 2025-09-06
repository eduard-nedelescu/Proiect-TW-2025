DROP TYPE IF EXISTS categ_oferta;
DROP TYPE IF EXISTS subcateg_oferta;

CREATE TYPE categ_oferta AS ENUM('educatie', 'mediu', 'social', 'cultural', 'sport', 'comuna');
CREATE TYPE subcateg_oferta AS ENUM('copii', 'adolescenti', 'studenti', 'seniori', 'persoane_defavorizate', 'persoane_cu_dizabilitati', 'comunitati_rurale', 'comuna');

CREATE TABLE IF NOT EXISTS produse (
   id SERIAL PRIMARY KEY,
   nume VARCHAR(255) UNIQUE NOT NULL,
   descriere TEXT,
   imagine VARCHAR(300),
   categorie categ_oferta DEFAULT 'comuna',
   subcategorie subcateg_oferta DEFAULT 'comuna',
   nr_locuri INT NOT NULL CHECK (nr_locuri >= 0),
   total_ore INT NOT NULL CHECK (total_ore >= 0),
   ore_pe_zi DECIMAL(4,2) NOT NULL CHECK (ore_pe_zi >= 0 AND ore_pe_zi <= 24),
   data_inceput TIMESTAMP NOT NULL,
   data_sfarsit TIMESTAMP NOT NULL,
   localitate VARCHAR(255) NOT NULL,
   abilitati VARCHAR[],
   accepta_voluntari BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO produse (nume, descriere, imagine, categorie, subcategorie, nr_locuri, total_ore, ore_pe_zi, data_inceput, data_sfarsit, localitate, abilitati, accepta_voluntari) VALUES
('Atelier de pictură pentru copii', 'Un atelier creativ unde copiii pot învăța să picteze și să-și exprime imaginația.', 'atelier-pictura-copii.jpg', 'educatie', 'copii', 20, 10, 2.5, '2023-11-01 10:00:00', '2023-11-30 12:00:00', 'București', '{"creativitate", "arta", "socializare"}', TRUE),
('Curs de educație ecologică', 'Curs destinat tinerilor pentru a învăța despre protecția mediului și sustenabilitate.', 'curs-educatie-ecologica.jpg', 'mediu', 'adolescenti', 30, 15, 3.0, '2023-11-05 09:00:00', '2023-12-05 17:00:00', 'Cluj-Napoca', '{"ecologie", "sustenabilitate", "responsabilitate"}', TRUE),
('Program de voluntariat pentru seniori', 'Oferim oportunități de voluntariat pentru seniori în diverse activități comunitare.', 'voluntariat-seniori.jpg', 'social', 'seniori', 15, 20, 4.0, '2023-11-10 08:00:00', '2023-12-10 16:00:00', 'Timișoara', '{"ajutor comunitar", "socializare", "activitati recreative"}', TRUE),
('Festival cultural anual', 'Un festival care celebrează cultura locală cu muzică, dans și artă.', 'festival-cultural.jpg', 'cultural', 'comuna', 500, 100, 8.0, '2023-11-15 12:00:00', '2023-11-20 22:00:00', 'Iași', '{"muzica", "dans", "arta"}', TRUE),
('Turneu sportiv pentru tineri', 'Competiție sportivă destinată tinerilor din comunitate.', 'turneu-sportiv.jpg', 'sport', 'adolescenti', 100, 50, 6.0, '2023-11-20 09:00:00', '2023-11-25 18:00:00', 'Brașov', '{"sport", "competitie", "echipa"}', TRUE),
('Atelier de gătit sănătos', 'Învățați să gătiți mese sănătoase și delicioase.', 'atelier-gatit-sanatos.jpg', 'educatie', 'adolescenti', 25, 8, 2.0, '2023-11-25 10:00:00', '2023-12-01 14:00:00', 'Constanța', '{"gatit", "sanatate", "nutritie"}', TRUE),
('Proiect de reabilitare a parcurilor', 'Participați la reabilitarea și întreținerea parcurilor locale.', 'reabilitare-parcuri.jpg', 'mediu', 'comunitati_rurale', 50, 30, 5.0, '2023-11-30 08:00:00', '2024-01-01 16:00:00', 'Sibiu', '{"reabilitare", "mediu", "comunitate"}', TRUE),
('Curs de dezvoltare personală pentru seniori', 'Cursuri interactive pentru dezvoltarea abilităților personale și sociale ale seniorilor.', 'dezvoltare-personala-seniori.jpg', 'social', 'seniori', 20, 12, 3.0, '2023-12-01 10:00:00', '2023-12-20 15:00:00', 'Oradea', '{"dezvoltare personala", "socializare", "abilitati"}', TRUE),
('Atelier de dans popular', 'Învățați pașii de bază ai dansurilor populare românești.', 'atelier-dans-popular.jpg', 'cultural', 'comuna', 30, 10, 2.0, '2023-12-05 18:00:00', '2023-12-15 20:00:00', 'București', '{"dans popular", "cultura", "socializare"}', TRUE),
('Competiție de alergare pentru tineri', 'O competiție de alergare destinată tinerilor, cu premii și medalii.', 'competitie-alergare.jpg', 'sport', 'adolescenti', 200, 40, 5.0, '2023-12-10 08:00:00', '2023-12-15 12:00:00', 'Cluj-Napoca', '{"alergare", "sport", "sanatate"}', TRUE),
('Program de mentorat pentru studenți', 'Oferim sesiuni de mentorat pentru studenți în diverse domenii profesionale.', 'mentorat-studenti.jpg', 'educatie', 'studenti', 40, 20, 4.0, '2023-12-15 10:00:00', '2024-01-15 14:00:00', 'Timișoara', '{"mentorat", "dezvoltare profesionala", "abilitati"}', TRUE),
('Atelier de artă pentru persoanele cu dizabilități', 'Un atelier creativ adaptat pentru persoanele cu dizabilități.', 'atelier-arta-dizabilitati.jpg', 'social', 'persoane_cu_dizabilitati', 15, 10, 2.0, '2023-12-20 10:00:00', '2023-12-30 12:00:00', 'Iași', '{"arta", "creativitate", "inclusivitate"}', TRUE),
('Proiect de sprijin pentru persoanele defavorizate', 'Oferim suport și resurse pentru persoanele defavorizate din comunitate.', 'sprijin-pers-defavorizate.jpg', 'social', 'persoane_defavorizate', 100, 60, 8.0, '2023-12-25 09:00:00', '2024-01-05 17:00:00', 'Brașov', '{"sprijin", "comunitate", "resurse"}', TRUE),
('Atelier de reciclare creativă', 'Învățați să creați obiecte utile din materiale reciclate.', 'atelier-reciclare.jpg', 'mediu', 'comuna', 30, 15, 3.0, '2024-01-01 10:00:00', '2024-01-10 12:00:00', 'Constanța', '{"reciclare", "creativitate", "mediu"}', TRUE),
('Curs de fotografie pentru seniori', 'Curs destinat seniorilor pentru a învăța să folosească aparatul foto și să surprindă momente frumoase.', 'curs-fotografie-seniori.jpg', 'cultural', 'seniori', 20, 10, 2.0, '2024-01-05 14:00:00', '2024-01-20 16:00:00', 'Oradea', '{"fotografie", "arta", "socializare"}', TRUE),
('Atelier de sport și sănătate pentru tineri', 'Un atelier interactiv despre importanța sportului și a unui stil de viață sănătos.', 'atelier-sport-sanatate.jpg', 'sport', 'adolescenti', 50, 20, 4.0, '2024-01-10 09:00:00', '2024-01-20 11:00:00', 'București', '{"sport", "sanatate", "educatie"}', TRUE),
('Curs de dezvoltare a abilităților sociale pentru copii', 'Cursuri interactive pentru dezvoltarea abilităților sociale ale copiilor.', 'dezvoltare-abilitati-sociale-copii.jpg', 'educatie', 'copii', 30, 15, 3.0, '2024-01-15 10:00:00', '2024-01-25 12:00:00', 'Cluj-Napoca', '{"abilitati sociale", "educatie", "socializare"}', TRUE),
('Atelier de muzică pentru persoanele cu dizabilități', 'Un atelier muzical adaptat pentru persoanele cu dizabilități, unde pot explora sunetele și ritmurile.', 'atelier-muzica-dizabilitati.jpg', 'cultural', 'persoane_cu_dizabilitati', 15, 10, 2.0, '2024-01-20 10:00:00', '2024-01-30 12:00:00', 'Iași', '{"muzica", "inclusivitate", "creativitate"}', TRUE),
('Proiect de revitalizare a comunităților rurale', 'Un proiect dedicat revitalizării comunităților rurale prin diverse activități și inițiative.', 'revitalizare-comunitati-rurale.jpg', 'social', 'comunitati_rurale', 100, 50, 6.0, '2024-01-25 08:00:00', '2024-02-05 16:00:00', 'Brașov', '{"revitalizare", "comunitate", "dezvoltare"}', TRUE),
('Atelier de scriere creativă pentru seniori', 'Un atelier unde seniorii pot explora arta scrisului și pot împărtăși poveștile lor.', 'atelier-scriere-seniori.jpg', 'cultural', 'seniori', 20, 10, 2.0, '2024-02-01 14:00:00', '2024-02-15 16:00:00', 'Oradea', '{"scriere creativa", "arta", "socializare"}', TRUE),
('Curs de educație financiară pentru tineri', 'Curs destinat tinerilor pentru a învăța despre gestionarea banilor și economii.', 'curs-educatie-financiara.jpg', 'educatie', 'adolescenti', 30, 15, 3.0, '2024-02-05 09:00:00', '2024-02-20 11:00:00', 'București', '{"educatie financiara", "economii", "responsabilitate"}', TRUE),
('Atelier de dans contemporan pentru copii', 'Un atelier unde copiii pot explora mișcarea și expresia prin dans contemporan.', 'atelier-dans-contemporan.jpg', 'cultural', 'copii', 25, 10, 2.0, '2024-02-10 10:00:00', '2024-02-20 12:00:00', 'Cluj-Napoca', '{"dans contemporan", "creativitate", "socializare"}', TRUE),
('Program de mentorat pentru seniori', 'Oferim sesiuni de mentorat pentru seniori în diverse domenii profesionale și personale.', 'mentorat-seniori.jpg', 'social', 'seniori', 20, 12, 3.0, '2024-02-15 10:00:00', '2024-02-28 14:00:00', 'Timișoara', '{"mentorat", "dezvoltare personala", "abilitati"}', TRUE),
('Atelier de fotografie pentru tineri', 'Un atelier interactiv unde tinerii pot învăța să folosească aparatul foto și să surprindă momente frumoase.', 'atelier-fotografie-tineri.jpg', 'cultural', 'adolescenti', 30, 15, 3.0, '2024-02-20 14:00:00', '2024-03-05 16:00:00', 'Brașov', '{"fotografie", "arta", "socializare"}', TRUE),
('Curs de dezvoltare a abilităților de comunicare pentru studenți', 'Cursuri interactive pentru dezvoltarea abilităților de comunicare ale studenților.', 'dezvoltare-comunicare-studenti.jpg', 'educatie', 'studenti', 40, 20, 4.0, '2024-02-25 10:00:00', '2024-03-10 12:00:00', 'Constanța', '{"comunicare", "dezvoltare personala", "abilitati"}', TRUE);