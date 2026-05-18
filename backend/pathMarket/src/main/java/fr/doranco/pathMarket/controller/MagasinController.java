package fr.doranco.pathMarket.controller;

import fr.doranco.pathMarket.model.dto.MagasinDto;
import fr.doranco.pathMarket.model.entity.Magasin;
import fr.doranco.pathMarket.repository.IMagasinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rest/magasins")
public class MagasinController {
    @Autowired
    private IMagasinRepository magasinRepository;

    @GetMapping
    public List<MagasinDto> getAllMagasins() {
        return magasinRepository.findAll()
                .stream()
                .map(m -> new MagasinDto(m.getId(), m.getNom(), m.getAdresse()))
                .toList();
    }
}
