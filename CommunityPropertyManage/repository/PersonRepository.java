package com.communityprojectmanage.CommunityPropertyManage.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;

import com.communityprojectmanage.CommunityPropertyManage.model.*;
public interface PersonRepository extends CrudRepository<Person, Integer>{
    @Query("SELECT person from Person person WHERE person.username=:username AND person.password=:password")
    public List<Person> findPersonByCredentials
        (@Param("username") String username,
            @Param("password") String password);
}
