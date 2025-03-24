(defrule bd68a3be-6486-49b6-80e8-0947fde86665
                    ?p <- (patient 
                                (id ?id)
   (fievre ?fievre)
   (TDR ?TDR)
   (age ?age)
                            )
                    (test (eq ?fievre TRUE))
   (test (eq ?TDR TRUE))
   (test (eq ?age 21))
                    =>
                    (assert (diagnostic  (id ?id)	(paludisme confirme)))
                    (assert (treatment  (id ?id)	(medicament ACT)))
                    )