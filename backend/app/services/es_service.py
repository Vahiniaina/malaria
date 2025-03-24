import  clips
import tempfile
import os

from models.case_model import Case
from schemas.case_schema import CaseToKnowledgeBase


class ExpertSystem:

    def __init__(self, id: str):
        self.env = clips.Environment()
        self.patient_id=id
        self.clear()
        self.setup_templates()
        self.load_rules()
        self.load_initial_facts()
        self.init_patient()

    def init_patient(self):
        self.env.assert_string(f"(patient (id \"{self.patient_id}\"))")


    def setup_templates(self):
        file_path = "/home/memoire/infra/v0/docker_malarIA/backend/app/clips/templates.clp"
        self.env.batch_star(file_path)

    def load_rules(self):
        file_path = "/home/memoire/infra/v0/docker_malarIA/backend/app/clips/rules.clp"
        self.env.batch_star(file_path)


    def load_initial_facts(self):
        file_path = "/home/memoire/infra/v0/docker_malarIA/backend/app/clips/initial_facts.clp"
        self.env.batch_star(file_path)


    def reset(self):
        self.env.reset()
        self.load_initial_facts()


    def clear(self):
        self.env.clear()

    def run(self):
        self.env.run()


    def add_symptom(self, symptom: str, value: str):
        temp= tempfile.NamedTemporaryFile( suffix='.clp')

        symptom_str=f"""
                    (defrule change
                        ?p <- (patient (id \"{self.patient_id}\"))
                        =>
                        (modify ?p ({symptom} {value}))
                    )
                    (run)
                    (undefrule change)
                    """

        with open(temp.name, 'w') as f:
            f.write(symptom_str)

        self.env.batch_star(temp.name)

        temp.close()


    def add_symptom_string(self, id: str, symptom: str, value: str):
        symptom_str=f"(patient (id \"{id}\")({symptom} {clips.Symbol(value)}))"

        self.env.assert_string(symptom_str)


    def add_symptom_temp(self, id: str, symptom: str, value: str):
        patient=self.env.find_template("patient")
        patient.assert_fact(id="3", name="aina")
    
    def get_diag(self):
        result={}
        for f in list(self.env.facts()):
            if f.template.name=='diagnostique' and f["id"]==self.patient_id:
                    result={"diagnostic":
                            {
                                "paludisme" : f["paludisme"],
                                "Severite":f["degre"]
                            }
                            }
                    
        return result
    

    def get_treat(self):
        result={}
        for f in list(self.env.facts()):
            if f.template.name=='traitement' and f["id"]==self.patient_id:
                result={"treatment":
                        {
                            "medicament": f["medicament"], 
                            "dose":"Voir posologie"
                        }
                       }
        return result
    
    @staticmethod
    def create_clp_rule(case: Case, data: CaseToKnowledgeBase):
        diag_line=['(id ?id)']
        treat_line=['(id ?id)']
        
        for i,j in data.diagnostique.items():
            diag_line.append(f"({clips.Symbol(i)} {clips.Symbol(j)})")
            
        for l,m in data.traitement.items():
            treat_line.append(f"({clips.Symbol(l)} {clips.Symbol(m)})")
            
        diag_str = "\t".join(diag_line)
        treat_str = "\t".join(treat_line)
        
        all_items = list(case.symptoms.items()) + list(case.analyses.items()) + list(case.patient_details.items())
        pattern_lines = ['(id ?id)']
        test_lines = []

        for k, v in all_items:
            var = f"?{clips.Symbol(k)}"
            pattern_lines.append(f"({clips.Symbol(k)} {clips.Symbol(var)})")
            test_lines.append(f'(test (eq {clips.Symbol(var)} {clips.Symbol(v)}))')

        pattern_str = "\n   ".join(pattern_lines)
        test_str = "\n   ".join(test_lines)

        clp_rule = f"""
                    (defrule {clips.Symbol(str(case.case_id))}
                    ?p <- (patient 
                                {pattern_str}
                            )
                    {test_str}
                    =>
                    (assert (diagnostic  {diag_str}))
                    (assert (treatment  {treat_str}))
                    )
                    """
        rule_text=clp_rule.strip()
        
        # Define directory and filename
        dir_path = "/home/memoire/infra/v0/docker_malarIA/backend/app/clips/doctor_knowlesge_base"
        file_name = f"{str(case.case_id)}.clp"
        file_path = os.path.join(dir_path, file_name)

        # Create directory if it doesn't exist
        os.makedirs(dir_path, exist_ok=True)

        # Write rule to file
        with open(file_path, "w") as f:
            f.write(rule_text)

            
if __name__ == "__main__":

    id="vkhkhchckh"
    system=ExpertSystem(id)
    # system.add_symptom( "enceinte", "TRUE")
    system.add_symptom( "fievre", "TRUE")
    # system.add_symptom( "enceinte_trim", "2em")s
    # system.add_symptom( "simple", "TRUE")
    # system.add_symptom( "derniers_localisation", "AntananarivoV d")
    system.add_symptom( "domicile", "Ambatoboeny")
    system.run()
    print(system.get_treat(), "\n", system.get_diag())
    
    
    case={
            "symptoms": {
                "fievre": 'TRUE',
                "domicile": 'Ambatoboeny'
            },
            "analyses": {
                "TDR": "TRUE"
            },
            "patient_details": {
                "age": 15
            }
         }
    print(case["symptoms"])
    # print(list(system.env.facts()))