package fr.doranco.pathMarket.controller;

import fr.doranco.pathMarket.model.dto.UserRegisterRequestDto;
import fr.doranco.pathMarket.model.entity.Utilisateur;
import fr.doranco.pathMarket.service.IUtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("/api/rest/user")
public class UtilisateurController implements IUtilisateurController{

    @Autowired
    private IUtilisateurService utilisateurService;

    public UtilisateurController(IUtilisateurService utilisateurService){
        this.utilisateurService = utilisateurService;
    }

    /**
     * Création d'un utilisateur.
     * @param utilisateur
     * @return utilisateur crée s'il n'existe pas ou bien un utilisateur modifié s'il est existe.
     */
    @Override
    @PostMapping(
            value = "/create",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)

    public ResponseEntity<Long> addUtilisateur(@RequestBody Utilisateur utilisateur) {

        //System.out.println("Utilisateur reçu : " + utilisateur)
        try {
            Utilisateur user = utilisateurService.addUtilisateur(utilisateur);
            return new ResponseEntity<>(user.getId(), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Mise à jour d'un utilisateur existant.
     * @param utilisateur
     * @return l'identifiant de l'utilisateur mis à jour ou une erreur si l'utilisateur n'existe pas ou si les données sont invalides.
     */
    @PutMapping("/update/{id}")
    @Override
    public ResponseEntity<Long> updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {

        try {
            Utilisateur updateUser = utilisateurService.updateUtilisateur(id, utilisateur);
            return new ResponseEntity<>(updateUser.getId(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @GetMapping(
            value = "/all",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserRegisterRequestDto>> getAllUsers() {
        try {
            List<UserRegisterRequestDto> userRegisterRequestDtos = utilisateurService.getUsers();
            return new ResponseEntity<>(userRegisterRequestDtos, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @DeleteMapping (value = "delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> supprimerUtilisateur(@PathVariable Long id) {
        try {
            utilisateurService.supprimerUtilisateur(id);
            return new ResponseEntity<>("Utilisateur supprimé avec succès !", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Override
    @GetMapping(value = "/search/{adresseEmail}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Utilisateur> getUtilisateurByAdresseEmail(String adresseEmail) {
        try {
            List<Utilisateur> utilisateurs = utilisateurService.getUtilisateurByAdresseEmail(adresseEmail);
            if (utilisateurs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(utilisateurs.get(0), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @PatchMapping(value = "/activation/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Utilisateur> activerUtilisateur(@PathVariable Long id) {
        try {
            Utilisateur utilisateur = utilisateurService.activerUtilisateur(id);
            return new ResponseEntity<>(utilisateur, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
