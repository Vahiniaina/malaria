
(defrule cas_simple
	(not (simple ?))
	?patient <- (patient 
                    (fievre ?fievre) 
                    (sueurs ?sueurs) 
                    (fatigue ?fatigue) 
                    (frissons ?frissons) 
                    (sensation_de_froid ?sensation_de_froid) 
                    (maux_de_tete ?maux_de_tete) 
                    (douleurs_musculaires ?douleurs_musculaires) 
                    (vomissements ?vomissements) 
                    (diarrhees ?diarrhees) 
                    (toux ?toux) 
                    (deshydratation ?deshydratation) 
                    (simple ?simple))

	(test (eq 
            ?fievre 
            ?sueurs 
            ?fatigue 
            ?frissons 
            ?sensation_de_froid 
            ?maux_de_tete 
            ?douleurs_musculaires 
            ?vomissements 
            ?diarrhees 
            ?toux 
            ?deshydratation 
            TRUE))
    =>
	(bind ?simple TRUE)
	(assert (simple ?simple))
	(modify ?patient (simple ?simple))
)

(defrule cas_grave
	(not (grave ?))
	?patient <- (patient (troubles_respiratoires_graves ?troubles_respiratoires_graves) 
                         (defaillance_cardiaque ?defaillance_cardiaque) 
                         (anemie_severe ?anemie_severe) 
                         (hypoglycemie ?hypoglycemie) 
                         (hyperparasitemie ?hyperparasitemie) 
                         (acidose ?acidose) 
                         (problemes_neurologiques ?problemes_neurologiques) 
                         (hemorragie ?hemorragie) 
                         (insuffisance_renale ?insuffisance_renale) 
                         (ictere ?ictere) 
                         (grave ?grave))
	(test (eq ?troubles_respiratoires_graves 
              ?defaillance_cardiaque 
              ?anemie_severe 
              ?hypoglycemie 
              ?hyperparasitemie 
              ?acidose 
              ?problemes_neurologiques 
              ?hemorragie 
              ?insuffisance_renale 
              ?ictere 
              TRUE))
    =>
	(bind ?grave TRUE)
	(assert (grave ?grave))
	(modify ?patient (grave ?grave))
)


; (defrule cas_disctrical
; 	?patient <-(patient 
;                     (fievre ?fievre) 
;                     (sueurs ?sueurs) 
;                     (fatigue ?fatigue) 
;                     (frissons ?frissons) 
;                     (sensation_de_froid ?sensation_de_froid) 
;                     (maux_de_tete ?maux_de_tete) 
;                     (douleurs_musculaires ?douleurs_musculaires) 
;                     (vomissements ?vomissements) 
;                     (diarrhees ?diarrhees) 
;                     (toux ?toux) 
;                     (deshydratation ?deshydratation) 
;                     (simple ?simple)
;                     (localisation ?localisation))
;     (localisation (district ?localisation)(classification ?classification))
;     (test (or (eq ?classification DNRS4) (eq ?classification DNRS3)))
;     (test (or 
;        (neq ?fievre FALSE) 
;        (neq ?sueurs FALSE) 
;        (neq ?fatigue FALSE) 
;        (neq ?frissons FALSE) 
;        (neq ?sensation_de_froid FALSE) 
;        (neq ?maux_de_tete FALSE) 
;        (neq ?douleurs_musculaires FALSE) 
;        (neq ?vomissements FALSE) 
;        (neq ?diarrhees FALSE) 
;        (neq ?toux FALSE) 
;        (neq ?deshydratation FALSE)))
;     =>
; 	(bind ?simple TRUE)
; 	(assert (simple ?simple))
; 	(modify ?patient (simple ?simple))

; )