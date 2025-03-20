
;;;;;;;;;;;;;;;;;;;;;;	Template for patient

(deftemplate patient

;;;;;;;;;;;;;;;;;;;;;;	Patient detail
   (slot id (type STRING))
   (slot age (type SYMBOL))
;  (slot age-cat (type SYMBOL)(allowed-symbols nourisson enfant adulte))
; (comment "Les zones ou le patient a ete pendant les 2 derniere semaine")
   (multislot derniers_localisation (type SYMBOL)) 
   (slot domicile (type SYMBOL))
   (slot poids (type SYMBOL))
   (slot sexe (type SYMBOL) (allowed-symbols m f ))
   (slot allaitement (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot enceinte (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot enceinte_trim (type SYMBOL) (allowed-symbols 1er 2em 3em))
   (multislot allergie (type SYMBOL))
   (multislot antecedents_medicaux (type SYMBOL))
   (slot type_de_sang (type SYMBOL) (allowed-symbols O+ O- A+ A- B+ B- AB+ AB-))
   ; (comment "Format: systolic/diastolic in mmHg, e.g., 120/80")
   (slot tension (type SYMBOL) (allowed-symbols FALSE TRUE)) 
   (slot diabete (type SYMBOL) (allowed-symbols FALSE TRUE))

;;;;;;;;;;;;;;;;;;;;;;	Symptomes simple

   (slot fievre (type SYMBOL) (allowed-symbols FALSE TRUE ))
   (slot sueurs (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot fatigue (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot frissons (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot sensation_de_froid (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot maux_de_tete (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot douleurs_musculaires (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot vomissements (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot diarrhees (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot toux (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot deshydratation (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot simple (type SYMBOL)(allowed-symbols FALSE TRUE))

;;;;;;;;;;;;;;;;;;;;;;	Symptomes grave

   (slot troubles_respiratoires_graves (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot defaillance_cardiaque (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot anemie_severe (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot hypoglycemie (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot hyperparasitemie (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot acidose (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot problemes_neurologiques (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot hemorragie (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot insuffisance_renale (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot ictere (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot grave (type SYMBOL)(allowed-symbols FALSE TRUE))

;;;;;;;;;;;;;;;;;;;;;;	Symptomes additionnel

   (slot fievre_48 (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot fievre_cyclique_48 (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot fievre_cyclique_72 (type SYMBOL) (allowed-symbols FALSE TRUE))

)




(deftemplate diagnostique
   (slot id (type STRING))
   (slot code_diagnostique (type SYMBOL))
   (slot degre (type SYMBOL) (allowed-symbols simple grave ))
   (slot parasite (type SYMBOL) (allowed-symbols falciparum vivax malariae ovale knowlesi))
   (slot hospitalisation (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot reanimateur (type SYMBOL) (allowed-symbols FALSE TRUE))
)



(deftemplate localisation
   (multislot region (type SYMBOL))
   (slot facies (type SYMBOL))
   (slot district (type SYMBOL))
   (slot classification (type SYMBOL)(allowed-symbols DNRS1 DNRS2 DNRS3 DNRS4))
)



(deftemplate analyse
   (slot id (type STRING))
   (slot TDR (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot goutte_epais (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot frotti_sanguin (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot PCR (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot HRP2 (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot HRP3 (type SYMBOL) (allowed-symbols FALSE TRUE))
   (slot pLDH (type SYMBOL) (allowed-symbols FALSE TRUE))
   (multislot analyse_parasitaire (type SYMBOL) (allowed-symbols falciparum vivax malariae ovale))
   (slot stade_parasitaire (type SYMBOL))
)

(deftemplate traitement
   (slot id (type STRING))
   (slot medicament (type STRING))
   (slot dose (type SYMBOL) )
   (slot duree (type INTEGER) )
   (slot surveillance (type SYMBOL))
   (slot effets_secondaires (type SYMBOL))
   (slot recommandations (type SYMBOL))
)

