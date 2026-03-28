package fr.doranco.pathMarket.repository;

import fr.doranco.pathMarket.model.entity.ListeDeCourses;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IListeCoursesRepository extends JpaRepository<ListeDeCourses, Long> {

}
